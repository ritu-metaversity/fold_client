export function defineCancelApiObject(apiObject) {
    const cancelApiObject = {}
    Object.getOwnPropertyNames(apiObject).forEach((apiPropertyName) => {
        const cancellationControllerObject = {
            controller: undefined,
        }

        // associating the request cancellation handler with the API property name
        cancelApiObject[apiPropertyName] = {
            handleRequestCancellation: () => {
                if (cancellationControllerObject.controller) {
                    cancellationControllerObject.controller.abort()
                }
                cancellationControllerObject.controller = new AbortController()
                return cancellationControllerObject.controller
            },
        }
    })
    return cancelApiObject
}