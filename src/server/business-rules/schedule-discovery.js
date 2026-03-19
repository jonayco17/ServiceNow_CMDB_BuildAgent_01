import { gs, GlideDateTime } from '@servicenow/glide';

export function scheduleNextDiscovery(current, previous) {
    // Only schedule if configuration is active and has a frequency set
    if (!current.getValue('active') || current.getValue('active') != 'true') {
        return;
    }
    
    var frequency = current.getValue('discovery_frequency');
    if (!frequency || frequency == 'manual') {
        // Clear next_run if manual
        current.setValue('next_run', '');
        return;
    }
    
    var nextRun = new GlideDateTime();
    
    switch (frequency) {
        case 'realtime':
            nextRun.addSeconds(300); // 5 minutes for realtime
            break;
        case 'hourly':
            nextRun.addSeconds(3600); // 1 hour
            break;
        case 'daily':
            nextRun.addDaysLocalTime(1); // 1 day
            break;
        case 'weekly':
            nextRun.addDaysLocalTime(7); // 1 week
            break;
        case 'monthly':
            nextRun.addMonthsLocalTime(1); // 1 month
            break;
        default:
            // Default to daily for unknown frequencies
            nextRun.addDaysLocalTime(1);
            break;
    }
    
    current.setValue('next_run', nextRun.getDisplayValue());
    
    gs.info('CMDB Discovery: Scheduled next run for configuration "' + current.getValue('name') + '" at ' + nextRun.getDisplayValue());
}