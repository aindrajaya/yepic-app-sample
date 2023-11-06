export async function POST(request) {

  /**
   * POST /api/express/create
   * @param {string} avatarId - The avatarId of the avatar to use.
   * @param {string} voiceId - The voiceId of the voice to use.
   * @param {string} script - The script to use.
   * @param {string} videoTitle - The title of the video.
   * 
   */

  const {nama, email } = await request.json();

  //Send to email the video result to email
  /**
   * POST /api/express/send-email
   * @param {string} nama - The name of the recipient.
   * @param {string} email - The email of the recipient.
   * @param {string} videoTitle - The title of the video.
   * @param {string} videoUrl - The url of the video.
   * 1. This function will send the email to the recipient
   * 2. We could using Sendgrid or Mailgun to send the email
   */

  // console.log(nama, company, "data dari form POST")

  const trialAvatar = "fad8c893-58ed-4855-b099-336580ec910f"
  const trialVoice = "en-US-JennyMultilingualNeural"

  const requestBody = {
    storageProvider: 'Gcs',
    parentId: null,
    groupId: null,
    draft: false,
    videoUrl: null,
    videoWatermarkedUrl: null,
    avatarId: trialAvatar,
    avatarName: null,
    avatarUrl: null,
    fullFrame: true,
    dynamic: false,
    voiceId: trialVoice,
    voiceOverId: null,
    voiceOverName: null,
    voiceOverUrl: null,
    script: `Hello, my name is ${nama}. I am testing Yepic AI video. I hope you like it`,
    speechVolume: null,
    speechSpeed: null,
    videoFormat: 'mp4',
    videoWidth: 1080,
    videoHeight: 1920,
    videoTitle: `Video Generated fom ${nama}`,
    visibility: 'Public',
    backgroundColor: null,
    backgroundImageId: null,
    backgroundImageName: null,
    backgroundImageUrl: null,
    backgroundVideoId: null,
    backgroundVideoName: null,
    backgroundVideoUrl: null,
    callbackUrl: null,
  };

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'X-Api-Key': process.env.API_KEY_YEPIC,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };

  const response = await fetch(`https://api.yepic.ai/v1/talkingphotos`, options);
  
  if(response.ok){
    const data = await response.json();
    console.log(data, "data hasil sukses")
    return Response.json(data);
  } else {
    return Response.json({ error: 'Internal Server Error' });
  }
}