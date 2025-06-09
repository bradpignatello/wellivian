// lib/services/oura.ts
export interface OuraReadinessData {
    score: number;
    temperature_deviation: number;
    temperature_trend_deviation: number;
    hrv_balance: number;
    recovery_index: number;
    resting_heart_rate: number;
  }
  
  export interface OuraSleepData {
    score: number;
    total: number;
    duration: number;
    efficiency: number;
    rem: number;
    deep: number;
    latency: number;
  }
  
  export interface OuraActivityData {
    score: number;
    steps: number;
    active_calories: number;
    total_calories: number;
    target_calories: number;
    meet_daily_targets: number;
  }
  
  export interface OuraHeartRateData {
    bpm: number;
    timestamp: string;
  }
  
  export class OuraService {
    private accessToken: string;
    
    constructor(accessToken: string) {
      this.accessToken = accessToken;
    }
    
    async getReadinessData(date?: string): Promise<OuraReadinessData> {
      const dateParam = date || new Date().toISOString().split('T')[0];
      const response = await fetch(
        `https://api.ouraring.com/v2/usercollection/daily_readiness?start_date=${dateParam}&end_date=${dateParam}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Oura API error: ${response.status}`);
      }
      
      const data = await response.json();
      const readinessData = data.data[0];
      
      return {
        score: readinessData.score,
        temperature_deviation: readinessData.temperature_deviation || 0,
        temperature_trend_deviation: readinessData.temperature_trend_deviation || 0,
        hrv_balance: readinessData.contributors.hrv_balance || 0,
        recovery_index: readinessData.contributors.recovery_index || 0,
        resting_heart_rate: readinessData.contributors.resting_heart_rate || 0
      };
    }
    
    async getSleepData(date?: string): Promise<OuraSleepData> {
      const dateParam = date || new Date().toISOString().split('T')[0];
      const response = await fetch(
        `https://api.ouraring.com/v2/usercollection/daily_sleep?start_date=${dateParam}&end_date=${dateParam}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Oura API error: ${response.status}`);
      }
      
      const data = await response.json();
      const sleepData = data.data[0];
      
      return {
        score: sleepData.score,
        total: sleepData.total_sleep_duration || 0,
        duration: sleepData.total_sleep_duration || 0,
        efficiency: sleepData.efficiency || 0,
        rem: sleepData.rem_sleep_duration || 0,
        deep: sleepData.deep_sleep_duration || 0,
        latency: sleepData.latency || 0
      };
    }
    
    async getActivityData(date?: string): Promise<OuraActivityData> {
      const dateParam = date || new Date().toISOString().split('T')[0];
      const response = await fetch(
        `https://api.ouraring.com/v2/usercollection/daily_activity?start_date=${dateParam}&end_date=${dateParam}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Oura API error: ${response.status}`);
      }
      
      const data = await response.json();
      const activityData = data.data[0];
      
      return {
        score: activityData.score,
        steps: activityData.steps || 0,
        active_calories: activityData.active_calories || 0,
        total_calories: activityData.total_calories || 0,
        target_calories: activityData.target_calories || 0,
        meet_daily_targets: activityData.meet_daily_targets || 0
      };
    }
    
    async getHeartRateData(date?: string): Promise<OuraHeartRateData[]> {
      const dateParam = date || new Date().toISOString().split('T')[0];
      const nextDay = new Date(dateParam);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const response = await fetch(
        `https://api.ouraring.com/v2/usercollection/heartrate?start_datetime=${dateParam}T00:00:00+00:00&end_datetime=${nextDay.toISOString().split('T')[0]}T00:00:00+00:00`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Oura API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data.map((item: any) => ({
        bpm: item.bpm,
        timestamp: item.timestamp
      }));
    }
    
    async getTodaysSummary() {
      try {
        const [readiness, sleep, activity] = await Promise.all([
          this.getReadinessData().catch(() => null),
          this.getSleepData().catch(() => null),
          this.getActivityData().catch(() => null)
        ]);
        
        return { 
          readiness: readiness || this.getDefaultReadinessData(),
          sleep: sleep || this.getDefaultSleepData(),
          activity: activity || this.getDefaultActivityData()
        };
      } catch (error) {
        console.error('Error fetching Oura data:', error);
        return {
          readiness: this.getDefaultReadinessData(),
          sleep: this.getDefaultSleepData(),
          activity: this.getDefaultActivityData()
        };
      }
    }
    
    private getDefaultReadinessData(): OuraReadinessData {
      return {
        score: 0,
        temperature_deviation: 0,
        temperature_trend_deviation: 0,
        hrv_balance: 0,
        recovery_index: 0,
        resting_heart_rate: 0
      };
    }
    
    private getDefaultSleepData(): OuraSleepData {
      return {
        score: 0,
        total: 0,
        duration: 0,
        efficiency: 0,
        rem: 0,
        deep: 0,
        latency: 0
      };
    }
    
    private getDefaultActivityData(): OuraActivityData {
      return {
        score: 0,
        steps: 0,
        active_calories: 0,
        total_calories: 0,
        target_calories: 0,
        meet_daily_targets: 0
      };
    }
  }