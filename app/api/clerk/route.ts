import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabse';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
// Define types for Clerk webhook payload
interface EmailAddress {
    email_address: string;
    id: string;
    verification: {
        status: string;
        strategy: string;
    };
}

interface ClerkUserEvent {
    data: {
        id: string;
        email_addresses: EmailAddress[];
        first_name: string | null;
        last_name: string | null;
        primary_email_address_id: string;
        user: {
            email_addresses: EmailAddress[];
            first_name: string | null;
            last_name: string | null;
            id: string;
        };
    };
    object: string;
    type: string;
}

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        // console.log("working",payload)
        // console.log("headers",headers())

        
        const headersList = headers();
        const svixId = headersList.get('svix-id');
        const svixTimestamp = headersList.get('svix-timestamp');
        const svixSignature = headersList.get('svix-signature');


        if (!svixId || !svixTimestamp || !svixSignature) {
            return NextResponse.json({ error: 'Missing headers' }, { status: 400 });
        }

        // Verify webhook signature
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
        let evt: ClerkUserEvent;

        // console.log("webhook",wh)

        try {
            evt = wh.verify(JSON.stringify(payload), {
                'svix-id': svixId,
                'svix-timestamp': svixTimestamp,
                'svix-signature': svixSignature,
            }) as ClerkUserEvent;
        } catch (err) {
            console.error('Error verifying webhook:', err);
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // console.log("evt",evt?.data?.user?.email_addresses)

        // Validate required data
        if (!evt.data || !Array.isArray(evt.data.user.email_addresses) || evt.data.user.email_addresses.length === 0) {
            console.error('Invalid or missing email addresses in webhook payload');
            return NextResponse.json(
                { error: 'Invalid webhook payload: missing email addresses' },
                { status: 400 }
            );
        }

        const { id, first_name, last_name } = evt.data.user;
        const email = evt.data.user.email_addresses[0].email_address;

        console.log("this is id",evt.data.user)

        if (!email) {
            console.error('No valid email address found in webhook payload');
            return NextResponse.json(
                { error: 'Invalid webhook payload: no valid email address' },
                { status: 400 }
            );
        }

        // Check if user exists
        const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        // console.log("existingUser",existingUser,fetchError)

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error fetching user from Supabase:', fetchError);
            return NextResponse.json(
                { error: 'Failed to fetch user' },
                { status: 500 }
            );
        }

        if (existingUser) {
            // Update existing user
            const { data: updatedUser, error: updateError } = await supabase
                .from('users')
                .update({
                    clerk_id: id,
                    first_name: first_name || existingUser.first_name, // Preserve existing if new is null
                    last_name: last_name || existingUser.last_name, // Preserve existing if new is null
                })
                .eq('email', email)
                .select();

            if (updateError) {
                console.error('Error updating user in Supabase:', updateError);
                return NextResponse.json(
                    { error: 'Failed to update user' },
                    { status: 500 }
                );
            }

            console.log("success",updatedUser)
            return NextResponse.json({ success: true, data: updatedUser });
        } else {
            // Insert new user

            const userId = uuidv4();

            const { data: newUser, error: insertError } = await supabase
                .from('users')
                .insert([
                    {
                        id: userId, // Add the UUID here

                    email,
                    first_name: first_name || '',
                    last_name: last_name || '',
                    clerk_id: id
                    },
                ])
                .select();

        if (insertError) {
            console.error('Error inserting user in Supabase:', insertError);
            return NextResponse.json(
                { error: 'Failed to insert user' },
                { status: 500 }
            );
        }

        console.log("success",newUser)
        return NextResponse.json({ success: true, data: newUser });
    }
    } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
    );
}
}