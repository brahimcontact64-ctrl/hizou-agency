
export async function loadCreativeVideos() {
  const response = await fetch("/videos.json");
  const data = await response.json();
  return data;
}

