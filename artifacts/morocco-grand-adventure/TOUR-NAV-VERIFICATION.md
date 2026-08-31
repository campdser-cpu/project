# Tours navigation verification contract

The Tours navigation is intentionally built from the canonical `CITY_HUBS` and `CITY_HUB_DURATIONS` data rather than hard-coded English labels.

Required destinations in the Tours menu:
- Tours / Our Tours
- Tours from Marrakech
- Tours from Casablanca
- Tours from Fes
- Tours from Agadir
- 3-day duration links for every departure hub
- city-specific tour pages
- Sahara Desert Tours

The navigation uses the active locale for city names, duration labels, Sahara/experience labels, CTA labels, and the mobile menu. It links only to routes registered by the application router.

Canonical router routes include:
- `/tours`
- `/tours/from-:city`
- `/tours/from-:city/:days`
- `/tours/:id`
- `/desert-tours`
- `/marrakech-tours`
- `/fes-tours`
- `/agadir-tours`
- `/casablanca-tours`

The city hubs themselves are sourced from `src/data/tour-hierarchy.ts`, which declares Marrakech, Casablanca, Fes and Agadir as the four departure-city hubs and their supported duration-hub paths.
