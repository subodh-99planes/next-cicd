const errors = {
  user: {
    auth_failed: 'Invalid username or password',
    invalid_token: 'Invalid Token',
    password_present: 'Password already generated',
    not_found: 'User not found',
    unauthorized: 'Unauthorized'
  },
  passport: {
    deserialization_error: 'Failed to deserialize user',
  },
  generic: {
    generic_error: 'It\'s not you. It\'s us. We are having some problems.',
    unknown_error: 'An unknown error occured',
    not_found: 'Resource not found'
  },
  survey: {
    not_found: 'Survey not available. Please try later'
  },
  email: {
    failed: 'Failed to send email'
  }
}

const generics = {
  success_messages: {
    password_generated: 'Password generated successfully',
    survey_submitted: 'Survey submitted. Please check your email for results',
    email_sent: 'Please check your email for results',
    accepted: 'Accepted'
  }
}

const email = {
  subject: 'IS Survey Results 💡',
  getHTML: (host, token): string => `
      <h1>Yay! Almost there 😀 !</h1>
      <p>
      Click 
      <a href="${host}/profile/password?token=${encodeURIComponent(token)}">
        here
      </a>
      to login and see your results
    `,
  getText: (host, token) => `Check your results here: ${host}/profile/password?token=${encodeURIComponent(token)}`
}

export { errors, email, generics }
