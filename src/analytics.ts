// Analytics tracking system
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export const log = (name: string, params?: Record<string, any>) => {
  // Only track in production
  if (import.meta.env.VITE_ENVIRONMENT !== 'production') {
    console.log('[Analytics Dev]', name, params)
    return
  }
  
  // Send to Google Analytics if available
  if (window.gtag) {
    window.gtag('event', name, params || {})
  }
}

// Onboarding events
export const trackOnboardingStart = () => log('onboarding_start')
export const trackOnboardingComplete = () => log('onboarding_complete')
export const trackPersonaView = (persona: string) => log('persona_view', { persona })

// Learning events
export const trackLessonStart = (lessonId: string) => log('lesson_start', { lesson_id: lessonId })
export const trackLessonComplete = (lessonId: string) => log('lesson_complete', { lesson_id: lessonId })
export const trackChallengeAttempt = (challengeId: string, success: boolean) => 
  log('challenge_attempt', { challenge_id: challengeId, success })

// Unit 1 specific events
export const trackKnowledgeGraphInteraction = (concept: string) => 
  log('knowledge_graph_interaction', { concept })
export const trackCodeCoachSubmit = (testsPassed: number, totalTests: number) =>
  log('code_coach_submit', { tests_passed: testsPassed, total_tests: totalTests })
export const trackAITutorInteraction = (persona: string, topic: string) =>
  log('ai_tutor_interaction', { persona, topic })

// User engagement
export const trackWaitlistSignup = (source: string) => log('waitlist_signup', { source })
export const trackFeatureExplore = (feature: string) => log('feature_explore', { feature })