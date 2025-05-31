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
  
  export class OuraService {
    private accessToken: string;
    
    constructor(accessToken: string) {
      this.accessToken = accessToken;
    }
    
    async getReadinessData(date?: string): Promise<OuraReadinessData> {
      const dateParam = date || new Date().toISOString().split('T')[0];
      const response = await fetch(
        `https://api.ouraring.com/v2/usercollection/readiness?start_date=${dateParam}&end_date=${dateParam}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );
      
      const data = await response.json();
      return data.data[0]; // Most recent readiness
    }
    
    async getSleepData(date?: string): Promise<OuraSleepData> {
      const dateParam = date || new Date().toISOString().split('T')[0];
      const response = await fetch(
        `https://api.ouraring.com/v2/usercollection/sleep?start_date=${dateParam}&end_date=${dateParam}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );
      
      const data = await response.json();
      return data.data[0]; // Most recent sleep
    }
    
    async getTodaysSummary() {
      const [readiness, sleep, activity] = await Promise.all([
        this.getReadinessData(),
        this.getSleepData(),
        this.getActivityData()
      ]);
      
      return { readiness, sleep, activity };
    }
    
    async getActivityData(date?: string): Promise<OuraActivityData> {
      // Similar implementation
    }
  }