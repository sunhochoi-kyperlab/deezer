import ErrorType from './errorType'

function oauthHandler (errorCode) {
  if (ErrorType.OAUTH.OAUTH_ERROR_NOBACK.code === errorCode) {
    console.log('[OAuth]', ErrorType.OAUTH.OAUTH_ERROR_NOBACK.message)
    return
  }

  let message
  switch (errorCode) {
    case ErrorType.OAUTH.OAUTH_ERROR_TIMESYNC.code:
      message = ErrorType.OAUTH.OAUTH_ERROR_TIMESYNC.message
      break
    case ErrorType.OAUTH.OAUTH_ERROR_TIMEOUT.code:
      message = ErrorType.OAUTH.OAUTH_ERROR_TIMEOUT.message
      break
    case ErrorType.OAUTH.OAUTH_ERROR_GENERIC.code:
      message = ErrorType.OAUTH.OAUTH_ERROR_GENERIC.message
      break
    case ErrorType.OAUTH.OAUTH_ERROR_CACHE_MISS.code:
      message = ErrorType.OAUTH.OAUTH_ERROR_CACHE_MISS.message
      break
    case ErrorType.OAUTH.OAUTH_ERROR_OOM.code:
      message = ErrorType.OAUTH.OAUTH_ERROR_OOM.message
      break
    case ErrorType.OAUTH.OAUTH_ERROR_CRASH.code:
      message = ErrorType.OAUTH.OAUTH_ERROR_CRASH.message
      break
    case ErrorType.OAUTH.OAUTH_ERROR_ACCESS_DENIED.code:
      message = ErrorType.OAUTH.OAUTH_ERROR_ACCESS_DENIED.message
      break
  }
  console.log('[OAuth] Login Error: ', message)
}

function apiHandler ({status, error}) {
  let type
  switch (status) {
    case ErrorType.API.NETWORK_ERROR.code:
      type = ErrorType.API.NETWORK_ERROR.type
      break
    case ErrorType.API.QUOTA.code:
      type = ErrorType.API.QUOTA.type
      break
    case ErrorType.API.ITEMS_LIMIT_EXCEEDED.code:
      type = ErrorType.API.ITEMS_LIMIT_EXCEEDED.type
      break
    case ErrorType.API.PERMISSION.code:
      type = ErrorType.API.PERMISSION.type
      break
    case ErrorType.API.TOKEN_INVALID.code:
      type = ErrorType.API.TOKEN_INVALID.type
      break
    case ErrorType.API.PARAMETER.code:
      type = ErrorType.API.PARAMETER.type
      break
    case ErrorType.API.PARAMETER_MISSING.code:
      type = ErrorType.API.PARAMETER_MISSING.type
      break
    case ErrorType.API.QUERY_INVALID.code:
      type = ErrorType.API.QUERY_INVALID.type
      break
    case ErrorType.API.SERVICE_BUSY.code:
      type = ErrorType.API.SERVICE_BUSY.type
      break
    case ErrorType.API.DATA_NOT_FOUND.code:
      type = ErrorType.API.DATA_NOT_FOUND.type
      break
    default:
      type = error ? error.type : 'error'
      break
  }
  const message = error ? `${type} - ${error.message}` : type
  console.log(`[API] Error: ${message}`)
}

export default {
  oauthHandler,
  apiHandler
}
