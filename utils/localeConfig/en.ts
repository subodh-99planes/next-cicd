const meta = {
  description: 'Learn about your Imagination Spectrum'
}

const errors = {
  generic: 'Something went Wrong',
  login: {
    email: {
      required: 'Email field is required.',
      invalid: 'Input must be a valid email address.',
    },
    password: {
      required: 'Password field is required.',
      min: 'Password must be at least 8 characters.',
    },
  },
  profile: {
    password: {
      mismatch: 'Passwords do not match',
      invalid: 'Invalid Password',
    },
  },
  survey: {
    invalidEmail: 'Invalid Email',
    localDataUnavailable: 'Local Survey data not available',
    not_found_redirect: 'Survey not available. Redirected to primary survey.'
  },
}

const labels = {
  tutorial: {
    options: 'Options',
    question: 'Question',
    prev: 'Prev Slide',
    next: 'Next Slide',
    complete: 'Got it'
  },
  landing: {
    sidebarText: {
      line1: `Let's get`,
      line2: 'started!',
    },
  },
  auth: {
    title: 'Create your account',
    desc: {
      line1: 'Please create an account to see the results.',
      line2: 'Connect your social account for one-click sign in:',
    },
    dividerText: 'or',
    hasAccount: 'Already have an account?',
    email: 'Email',
    password: 'Password',
    sidebarText: {
      line1: `Let's`,
      line2: 'finalize it!',
    },
    login: 'Log In',
    logout: 'Log out',
  },
  survey: {
    startSurvey: 'Start Survey',
    completeText: 'Complete Survey',
    emailInput: 'Enter your email',
    seeResults: 'See Results',
    login: 'Login',
    googleLogin: 'Login with Google',
    facebookLogin: 'Login With Facebook',
    start: 'Start',
    back: 'Back',
    next: 'Next',
    view: 'View Results',
    skip: 'Skip'
  },
  home: {
    welcome: 'Welcome Home',
  },
  profile: {
    password: 'Password',
    reenterPassword: 'Re-enter Password',
    setPassword: 'Update Password',
    passwordStrength: {
      strong: 'strong',
      medium: 'medium',
      enough: 'easy',
    },
  },
}

export { labels, errors, meta }
