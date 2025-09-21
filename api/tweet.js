// api/tweet.js

import { TwitterApi } from 'twitter-api-v2';

// This is the main function Vercel will run
export default async function handler(request, response) {
  // We only want to handle POST requests to this endpoint
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Instantiate the client with your credentials from environment variables
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    // Get a read-write client
    const rwClient = client.v2.readWrite;

    // Post the tweet!
    const { data: createdTweet } = await rwClient.tweet('hi');

    // Send a success response back to the frontend
    console.log('Tweet success:', createdTweet.id);
    response.status(200).json({
      success: true,
      message: `Successfully tweeted "hi"! Tweet ID: ${createdTweet.id}`,
    });

  } catch (error) {
    // If something went wrong, log the error and send a server error response
    console.error('Error tweeting:', error);
    response.status(500).json({
      success: false,
      message: 'Error: Could not send tweet.',
    });
  }
}