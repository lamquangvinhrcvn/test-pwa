import { setOptions, importLibrary } from '@googlemaps/js-api-loader'

let loaded = false
let loadPromise: Promise<void> | null = null

export const useGoogleMaps = () => {
  const config = useRuntimeConfig()

  async function loadGoogleMaps(): Promise<void> {
    if (!import.meta.client) {
      throw new Error('Google Maps can only be loaded client-side')
    }

    if (loaded) return
    if (loadPromise) return loadPromise

    setOptions({ key: config.public.googleMapsApiKey as string })
    loadPromise = importLibrary('maps').then(() => {
      loaded = true
      loadPromise = null
    })

    return loadPromise
  }

  return { loadGoogleMaps }
}
