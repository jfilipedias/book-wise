export function debounce<Args = unknown, Result = void>(
  callback: (args?: Args) => Promise<Result>,
  delay = 1000,
): (args?: Args) => Promise<Result> {
  let timeoutId: NodeJS.Timeout

  return (args?: Args): Promise<Result> => {
    return new Promise((resolve) => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => resolve(callback(args)), delay)
    })
  }
}
