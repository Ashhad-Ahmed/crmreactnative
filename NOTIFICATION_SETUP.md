# Notification Reminder System Setup

This document explains how to set up and use the notification reminder system in your React Native app.

## Features

- **One-time notifications**: Set a specific date and time for a reminder
- **Daily notifications**: Set a daily recurring reminder at a specific time
- **Background notifications**: Notifications work even when the app is closed or device is locked
- **Test functionality**: Test notifications with a 10-second delay

## Setup Instructions

### 1. Dependencies Installed

The following packages have been installed:
- `react-native-push-notification`
- `@react-native-community/push-notification-ios`

### 2. Android Configuration

The Android manifest has been updated with:
- Required permissions (VIBRATE, RECEIVE_BOOT_COMPLETED, WAKE_LOCK, SCHEDULE_EXACT_ALARM)
- Notification receivers and services
- Notification icon (`ic_notification.xml`)

### 3. iOS Configuration

For iOS, you'll need to:
1. Add notification capabilities in Xcode
2. Request notification permissions at runtime

## How to Use

### Setting Up Notifications

1. **Open the NotificationReminder screen**
2. **Select Date**: Choose a future date (disabled for daily notifications)
3. **Select Time**: Choose the time for your reminder
4. **Daily Toggle**: Enable for recurring daily notifications
5. **Set Reminder**: Tap the "Set Reminder" button

### Testing Notifications

1. **Test Button**: Use the "Test Notification (10s)" button to test notifications
2. **Background Test**: Close the app and wait for the notification
3. **Lock Screen Test**: Lock your device and wait for the notification

### Managing Notifications

- **Cancel All**: Use the "Cancel All Notifications" button to remove all scheduled reminders
- **Individual Cancel**: The system automatically manages individual notifications

## Technical Details

### NotificationService

The `NotificationService` class handles:
- Push notification configuration
- Android notification channels
- Scheduling one-time and daily notifications
- Canceling notifications
- Error handling

### Key Features

- **High Priority**: Notifications are set to high priority to ensure delivery
- **Wake Lock**: Uses WAKE_LOCK permission to ensure notifications trigger even when device is in deep sleep
- **Boot Completed**: Notifications persist after device restart
- **Exact Alarm**: Uses SCHEDULE_EXACT_ALARM for precise timing

### Notification Properties

- **Title**: "Reminder" or "Daily Reminder"
- **Message**: Customizable reminder message
- **Sound**: Default system sound
- **Vibration**: 300ms vibration
- **Actions**: "View" and "Dismiss" buttons
- **Icon**: Custom notification icon
- **Color**: Blue accent color (#007bff)

## Troubleshooting

### Common Issues

1. **Notifications not appearing**:
   - Check notification permissions in device settings
   - Ensure the app has notification access
   - Verify the date/time is in the future

2. **Android-specific issues**:
   - Check if battery optimization is disabled for the app
   - Verify notification channels are created
   - Ensure all permissions are granted

3. **iOS-specific issues**:
   - Request notification permissions in app
   - Check notification settings in iOS Settings
   - Verify app has background app refresh enabled

### Debug Information

The app logs important information:
- Notification scheduling details
- Channel creation status
- Error messages
- Scheduled notification IDs

## Testing Checklist

- [ ] Test one-time notification with future date/time
- [ ] Test daily notification
- [ ] Test notification when app is closed
- [ ] Test notification when device is locked
- [ ] Test notification after device restart
- [ ] Test cancel all notifications
- [ ] Test error handling with past date/time

## Security Considerations

- Notifications are local only (no server required)
- No sensitive data is stored in notifications
- Permissions are requested at runtime
- Notification content is user-defined 