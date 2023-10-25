export async function POST(request) {

  /**
   * POST /api/express/create
   * @param {string} avatarId - The avatarId of the avatar to use.
   * @param {string} voiceId - The voiceId of the voice to use.
   * @param {string} script - The script to use.
   * @param {string} videoTitle - The title of the video.
   * 
   */

  const { avatarId, voiceId, script, videoTitle } = await request.json();
  const trialAvatar = "fad8c893-58ed-4855-b099-336580ec910f"
  const trialVoice = "en-US-JennyMultilingualNeural"

  const requestBody = {
    storageProvider: 'Gcs',
    parentId: null,
    groupId: null,
    draft: false,
    videoUrl: null,
    videoWatermarkedUrl: null,
    avatarId: avatarId,
    avatarName: null,
    avatarUrl: null,
    fullFrame: true,
    dynamic: false,
    voiceId: voiceId,
    voiceOverId: null,
    voiceOverName: null,
    voiceOverUrl: null,
    script: script,
    speechVolume: null,
    speechSpeed: null,
    videoFormat: 'mp4',
    videoWidth: 1080,
    videoHeight: 1920,
    videoTitle: videoTitle,
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