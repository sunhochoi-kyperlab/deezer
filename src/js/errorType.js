export default {
  OAUTH: {
    OAUTH_ERROR_TIMESYNC: {
      // time setting이 맞지 않을 경우
      code: 0,
      message: 'The time setting is not correct.'
    },
    OAUTH_ERROR_TIMEOUT: {
      // timeout 이 발생 할 경우
      code: 1,
      message: 'Time out has occurred.'
    },
    OAUTH_ERROR_GENERIC: {
      // 일반적인 에러
      code: 2,
      message: 'Common error has occurred.'
    },
    OAUTH_ERROR_CACHE_MISS: {
      // cache에 문제가 있을 경우
      code: 3,
      message: 'Cache related problems occurred.'
    },
    OAUTH_ERROR_OOM: {
      // out of memory 가 발생할 경우
      code: 4,
      message: 'Out of memory.'
    },
    OAUTH_ERROR_CRASH: {
      // crash 가 발생할 경우
      code: 5,
      message: 'A crash occurred.'
    },
    OAUTH_ERROR_ACCESS_DENIED: {
      // user가 사용 동의를 거절할 경우
      code: 6,
      message: 'The user declined the use agreement.'
    },
    OAUTH_ERROR_NOBACK: {
      // user가 로그인 화면에서 back 버튼을 눌러 로그인화면을 벗어난 경우
      code: 7,
      message: 'The user exited the screen by pressing the back button.'
    }
  },
  API: {
    NETWORK_ERROR: {
      code: 0,
      type: 'NetworkNotConnet'
    },
    QUOTA: {
      code: 4,
      type: 'Exception'
    },
    ITEMS_LIMIT_EXCEEDED: {
      code: 100,
      type: 'Exception'
    },
    PERMISSION: {
      code: 200,
      type: 'OAuthException'
    },
    TOKEN_INVALID: {
      code: 300,
      type: 'OAuthException'
    },
    PARAMETER: {
      code: 500,
      type: 'ParameterException'
    },
    PARAMETER_MISSING: {
      code: 501,
      type: 'MissingParameterException'
    },
    QUERY_INVALID: {
      code: 600,
      type: 'InvalidQueryException'
    },
    SERVICE_BUSY: {
      code: 700,
      type: 'Exception'
    },
    DATA_NOT_FOUND: {
      code: 800,
      type: 'DataException'
    }
  }
}
