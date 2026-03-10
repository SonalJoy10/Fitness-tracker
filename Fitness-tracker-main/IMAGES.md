# Fitness Tracker Application - Image Assets

## Asset Structure

```
src/assets/
├── images/
│   ├── workouts/
│   │   ├── chest.svg       - Chest & Triceps workout icon
│   │   ├── back.svg        - Back & Biceps workout icon
│   │   ├── legs.svg        - Legs & Glutes workout icon
│   │   ├── shoulders.svg   - Shoulders & Core workout icon
│   │   └── cardio.svg      - Cardio workout icon
│   └── avatars/
│       ├── john.svg        - User profile avatar (John Doe)
│       └── jane.svg        - User profile avatar (Jane Smith)
```

## Adding Your Own Images

### Workout Images
1. Add your workout images to `src/assets/images/workouts/`
2. Update the `imageUrl` in [WorkoutService](src/app/services/workout.service.ts)
3. Example:
   ```typescript
   imageUrl: 'assets/images/workouts/your-image.jpg'
   ```

### User Avatars
1. Add user avatars to `src/assets/images/avatars/`
2. Update the `profileImage` in [UserService](src/app/services/user.service.ts)
3. Example:
   ```typescript
   profileImage: 'assets/images/avatars/user-name.jpg'
   ```

## Supported Formats
- SVG (Recommended for icons and scalable graphics)
- JPG/JPEG (For photographs)
- PNG (For transparent backgrounds)
- WebP (For optimized web images)

## Current Assets

### Workout Icons (SVG)
- **Chest**: Gradient red workout icon with chest focus
- **Back**: Gradient teal workout icon with back focus
- **Legs**: Gradient green workout icon with leg focus
- **Shoulders**: Gradient orange workout icon with shoulder focus
- **Cardio**: Gradient yellow workout icon for cardio workouts

### User Avatars (SVG)
- **John Doe**: Purple gradient avatar
- **Jane Smith**: Pink/red gradient avatar

## Size Recommendations
- **Workout images**: 300x200px minimum
- **Avatar images**: 200x200px minimum
- **SVG files**: Scalable (no size limit needed)

## Next Steps
1. Replace placeholder SVGs with your own images
2. Update image references in services
3. Ensure images are optimized for web
4. Test responsive behavior on different screen sizes
