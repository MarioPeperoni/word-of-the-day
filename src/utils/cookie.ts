export function getCookie(name: string) {
  const cookie = document.cookie

  const cookieValue = cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))
    ?.split('=')[1]

  return cookieValue ? decodeURIComponent(cookieValue) : null
}
