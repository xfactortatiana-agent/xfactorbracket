import { Team } from '../lib/predictor';

// 2025 March Madness Teams (Mock data based on projected field)
export const teams2025: Team[] = [
  // South Region
  { id: 'auburn', name: 'Auburn', seed: 1, region: 'South', record: '28-4', adjOE: 123.5, adjDE: 92.1, tempo: 69.2, luck: 0.042, sos: 0.85, last10: '8-2', confRecord: '15-3', upsetFactor: 0.2 },
  { id: 'michigan-st', name: 'Michigan State', seed: 2, region: 'South', record: '26-5', adjOE: 118.3, adjDE: 94.5, tempo: 67.8, luck: 0.031, sos: 0.82, last10: '7-3', confRecord: '14-4', upsetFactor: 0.3 },
  { id: 'iowa-st', name: 'Iowa State', seed: 3, region: 'South', record: '24-7', adjOE: 115.2, adjDE: 93.8, tempo: 68.5, luck: -0.015, sos: 0.80, last10: '6-4', confRecord: '13-5', upsetFactor: 0.4 },
  { id: 'texas-am', name: 'Texas A&M', seed: 4, region: 'South', record: '22-9', adjOE: 114.8, adjDE: 95.2, tempo: 66.4, luck: 0.028, sos: 0.78, last10: '7-3', confRecord: '11-7', upsetFactor: 0.5 },
  { id: 'michigan', name: 'Michigan', seed: 5, region: 'South', record: '21-10', adjOE: 116.5, adjDE: 96.8, tempo: 70.1, luck: -0.008, sos: 0.79, last10: '6-4', confRecord: '10-8', upsetFactor: 0.3 },
  { id: 'ole-miss', name: 'Ole Miss', seed: 6, region: 'South', record: '20-11', adjOE: 113.2, adjDE: 97.5, tempo: 68.9, luck: 0.045, sos: 0.76, last10: '5-5', confRecord: '9-9', upsetFactor: 0.6 },
  { id: 'marquette', name: 'Marquette', seed: 7, region: 'South', record: '19-12', adjOE: 112.8, adjDE: 98.2, tempo: 67.5, luck: 0.012, sos: 0.77, last10: '5-5', confRecord: '10-10', upsetFactor: 0.5 },
  { id: 'louisville', name: 'Louisville', seed: 8, region: 'South', record: '18-13', adjOE: 111.5, adjDE: 99.1, tempo: 68.2, luck: -0.022, sos: 0.75, last10: '4-6', confRecord: '9-11', upsetFactor: 0.4 },
  { id: 'gonzaga', name: 'Gonzaga', seed: 9, region: 'South', record: '25-6', adjOE: 119.2, adjDE: 101.5, tempo: 71.3, luck: 0.038, sos: 0.68, last10: '8-2', confRecord: '14-2', upsetFactor: 0.3 },
  { id: 'new-mexico', name: 'New Mexico', seed: 10, region: 'South', record: '26-5', adjOE: 114.5, adjDE: 102.8, tempo: 69.8, luck: 0.055, sos: 0.65, last10: '9-1', confRecord: '15-3', upsetFactor: 0.7 },
  { id: 'drake', name: 'Drake', seed: 11, region: 'South', record: '28-3', adjOE: 113.8, adjDE: 103.2, tempo: 67.1, luck: 0.048, sos: 0.62, last10: '10-0', confRecord: '16-2', upsetFactor: 0.8 },
  { id: 'colorado-st', name: 'Colorado State', seed: 12, region: 'South', record: '24-7', adjOE: 112.5, adjDE: 104.5, tempo: 66.8, luck: 0.032, sos: 0.66, last10: '7-3', confRecord: '13-5', upsetFactor: 0.6 },
  { id: 'vermont', name: 'Vermont', seed: 13, region: 'South', record: '26-5', adjOE: 108.2, adjDE: 102.5, tempo: 64.2, luck: 0.065, sos: 0.48, last10: '9-1', confRecord: '15-1', upsetFactor: 0.9 },
  { id: 'montana', name: 'Montana', seed: 14, region: 'South', record: '24-8', adjOE: 106.8, adjDE: 104.2, tempo: 63.5, luck: 0.042, sos: 0.45, last10: '8-2', confRecord: '14-4', upsetFactor: 0.8 },
  { id: 'norfolk-st', name: 'Norfolk State', seed: 15, region: 'South', record: '22-10', adjOE: 102.5, adjDE: 106.8, tempo: 65.1, luck: 0.038, sos: 0.42, last10: '7-3', confRecord: '12-4', upsetFactor: 0.9 },
  { id: 'southeast-mo', name: 'Southeast Missouri', seed: 16, region: 'South', record: '19-13', adjOE: 98.2, adjDE: 108.5, tempo: 66.4, luck: 0.025, sos: 0.38, last10: '6-4', confRecord: '10-8', upsetFactor: 0.95 },

  // East Region
  { id: 'duke', name: 'Duke', seed: 1, region: 'East', record: '29-3', adjOE: 125.2, adjDE: 91.8, tempo: 70.5, luck: 0.055, sos: 0.88, last10: '9-1', confRecord: '16-2', upsetFactor: 0.1 },
  { id: 'alabama', name: 'Alabama', seed: 2, region: 'East', record: '25-6', adjOE: 122.8, adjDE: 95.5, tempo: 73.2, luck: 0.028, sos: 0.85, last10: '7-3', confRecord: '15-3', upsetFactor: 0.3 },
  { id: 'baylor', name: 'Baylor', seed: 3, region: 'East', record: '23-8', adjOE: 118.5, adjDE: 96.2, tempo: 69.8, luck: -0.012, sos: 0.83, last10: '6-4', confRecord: '12-6', upsetFactor: 0.4 },
  { id: 'arizona', name: 'Arizona', seed: 4, region: 'East', record: '22-9', adjOE: 117.2, adjDE: 97.5, tempo: 71.5, luck: 0.018, sos: 0.81, last10: '6-4', confRecord: '11-7', upsetFactor: 0.3 },
  { id: 'clemson', name: 'Clemson', seed: 5, region: 'East', record: '21-10', adjOE: 115.8, adjDE: 98.2, tempo: 67.2, luck: 0.035, sos: 0.79, last10: '7-3', confRecord: '12-6', upsetFactor: 0.5 },
  { id: 'byu', name: 'BYU', seed: 6, region: 'East', record: '23-8', adjOE: 116.2, adjDE: 99.5, tempo: 70.8, luck: 0.022, sos: 0.77, last10: '6-4', confRecord: '11-5', upsetFactor: 0.5 },
  { id: 'dayton', name: 'Dayton', seed: 7, region: 'East', record: '24-7', adjOE: 114.5, adjDE: 100.2, tempo: 66.5, luck: 0.048, sos: 0.74, last10: '8-2', confRecord: '13-3', upsetFactor: 0.6 },
  { id: 'mississippi-st', name: 'Mississippi State', seed: 8, region: 'East', record: '19-12', adjOE: 112.2, adjDE: 101.5, tempo: 68.2, luck: -0.008, sos: 0.76, last10: '5-5', confRecord: '8-10', upsetFactor: 0.5 },
  { id: 'tcu', name: 'TCU', seed: 9, region: 'East', record: '20-11', adjOE: 113.5, adjDE: 102.8, tempo: 69.5, luck: 0.015, sos: 0.75, last10: '6-4', confRecord: '9-9', upsetFactor: 0.5 },
  { id: 'nevada', name: 'Nevada', seed: 10, region: 'East', record: '25-6', adjOE: 112.8, adjDE: 103.5, tempo: 67.8, luck: 0.058, sos: 0.68, last10: '8-2', confRecord: '14-4', upsetFactor: 0.7 },
  { id: 'north-texas', name: 'North Texas', seed: 11, region: 'East', record: '27-4', adjOE: 111.5, adjDE: 104.2, tempo: 62.5, luck: 0.065, sos: 0.65, last10: '9-1', confRecord: '15-3', upsetFactor: 0.8 },
  { id: 'charleston', name: 'Charleston', seed: 12, region: 'East', record: '26-5', adjOE: 110.2, adjDE: 105.5, tempo: 68.5, luck: 0.042, sos: 0.62, last10: '8-2', confRecord: '14-4', upsetFactor: 0.7 },
  { id: 'samford', name: 'Samford', seed: 13, region: 'East', record: '25-6', adjOE: 107.5, adjDE: 106.2, tempo: 71.2, luck: 0.055, sos: 0.52, last10: '9-1', confRecord: '15-3', upsetFactor: 0.9 },
  { id: 'akron', name: 'Akron', seed: 14, region: 'East', record: '22-9', adjOE: 105.8, adjDE: 107.5, tempo: 65.8, luck: 0.038, sos: 0.48, last10: '7-3', confRecord: '13-5', upsetFactor: 0.8 },
  { id: 'longwood', name: 'Longwood', seed: 15, region: 'East', record: '20-12', adjOE: 101.2, adjDE: 109.2, tempo: 66.5, luck: 0.045, sos: 0.42, last10: '7-3', confRecord: '11-5', upsetFactor: 0.9 },
  { id: 'wagner', name: 'Wagner', seed: 16, region: 'East', record: '16-14', adjOE: 97.5, adjDE: 111.5, tempo: 64.2, luck: 0.032, sos: 0.38, last10: '6-4', confRecord: '9-7', upsetFactor: 0.95 },

  // Midwest Region
  { id: 'houston', name: 'Houston', seed: 1, region: 'Midwest', record: '30-2', adjOE: 124.8, adjDE: 89.5, tempo: 64.2, luck: 0.048, sos: 0.82, last10: '10-0', confRecord: '17-1', upsetFactor: 0.2 },
  { id: 'tennessee', name: 'Tennessee', seed: 2, region: 'Midwest', record: '26-5', adjOE: 120.5, adjDE: 93.2, tempo: 65.8, luck: 0.022, sos: 0.85, last10: '8-2', confRecord: '15-3', upsetFactor: 0.3 },
  { id: 'kentucky', name: 'Kentucky', seed: 3, region: 'Midwest', record: '24-7', adjOE: 119.2, adjDE: 95.8, tempo: 71.5, luck: 0.035, sos: 0.84, last10: '7-3', confRecord: '13-5', upsetFactor: 0.3 },
  { id: 'purdue', name: 'Purdue', seed: 4, region: 'Midwest', record: '22-9', adjOE: 117.5, adjDE: 96.5, tempo: 68.2, luck: -0.005, sos: 0.80, last10: '6-4', confRecord: '11-7', upsetFactor: 0.4 },
  { id: 'wisconsin', name: 'Wisconsin', seed: 5, region: 'Midwest', record: '23-8', adjOE: 115.2, adjDE: 97.8, tempo: 66.5, luck: 0.042, sos: 0.78, last10: '7-3', confRecord: '12-6', upsetFactor: 0.4 },
  { id: 'illinois', name: 'Illinois', seed: 6, region: 'Midwest', record: '21-10', adjOE: 114.8, adjDE: 98.5, tempo: 70.2, luck: 0.018, sos: 0.79, last10: '6-4', confRecord: '10-8', upsetFactor: 0.5 },
  { id: 'florida', name: 'Florida', seed: 7, region: 'Midwest', record: '22-9', adjOE: 113.5, adjDE: 99.2, tempo: 69.5, luck: 0.028, sos: 0.77, last10: '6-4', confRecord: '11-7', upsetFactor: 0.5 },
  { id: 'utah-st', name: 'Utah State', seed: 8, region: 'Midwest', record: '26-5', adjOE: 114.2, adjDE: 100.5, tempo: 67.8, luck: 0.055, sos: 0.72, last10: '9-1', confRecord: '14-4', upsetFactor: 0.6 },
  { id: 'northwestern', name: 'Northwestern', seed: 9, region: 'Midwest', record: '20-11', adjOE: 111.8, adjDE: 101.8, tempo: 65.2, luck: 0.012, sos: 0.76, last10: '5-5', confRecord: '9-9', upsetFactor: 0.5 },
  { id: 'colorado', name: 'Colorado', seed: 10, region: 'Midwest', record: '22-9', adjOE: 112.5, adjDE: 102.5, tempo: 68.8, luck: 0.025, sos: 0.75, last10: '6-4', confRecord: '10-8', upsetFactor: 0.5 },
  { id: 'oregon', name: 'Oregon', seed: 11, region: 'Midwest', record: '20-12', adjOE: 111.2, adjDE: 103.8, tempo: 69.2, luck: -0.012, sos: 0.74, last10: '5-5', confRecord: '9-9', upsetFactor: 0.6 },
  { id: 'mcneese', name: 'McNeese', seed: 12, region: 'Midwest', record: '28-3', adjOE: 110.5, adjDE: 104.5, tempo: 66.2, luck: 0.068, sos: 0.58, last10: '10-0', confRecord: '17-1', upsetFactor: 0.9 },
  { id: 'vermont', name: 'Vermont', seed: 13, region: 'Midwest', record: '26-5', adjOE: 108.2, adjDE: 105.2, tempo: 64.5, luck: 0.052, sos: 0.55, last10: '9-1', confRecord: '15-1', upsetFactor: 0.9 },
  { id: 'colgate', name: 'Colgate', seed: 14, region: 'Midwest', record: '24-8', adjOE: 106.5, adjDE: 106.8, tempo: 67.1, luck: 0.045, sos: 0.48, last10: '8-2', confRecord: '14-4', upsetFactor: 0.8 },
  { id: 'long-beach', name: 'Long Beach State', seed: 15, region: 'Midwest', record: '20-12', adjOE: 102.8, adjDE: 108.5, tempo: 68.5, luck: 0.038, sos: 0.45, last10: '7-3', confRecord: '11-5', upsetFactor: 0.9 },
  { id: 'saint-francis', name: 'Saint Francis', seed: 16, region: 'Midwest', record: '15-16', adjOE: 98.5, adjDE: 112.2, tempo: 69.8, luck: 0.028, sos: 0.38, last10: '5-5', confRecord: '8-8', upsetFactor: 0.95 },

  // West Region
  { id: 'florida', name: 'Florida', seed: 1, region: 'West', record: '27-4', adjOE: 123.2, adjDE: 93.5, tempo: 70.8, luck: 0.038, sos: 0.86, last10: '9-1', confRecord: '16-2', upsetFactor: 0.2 },
  { id: 'st-johns', name: "St. John's", seed: 2, region: 'West', record: '26-5', adjOE: 119.8, adjDE: 95.2, tempo: 72.5, luck: 0.045, sos: 0.84, last10: '9-1', confRecord: '15-3', upsetFactor: 0.3 },
  { id: 'texas-tech', name: 'Texas Tech', seed: 3, region: 'West', record: '24-7', adjOE: 117.2, adjDE: 94.8, tempo: 66.5, luck: 0.022, sos: 0.83, last10: '7-3', confRecord: '13-5', upsetFactor: 0.3 },
  { id: 'arizona', name: 'Arizona', seed: 4, region: 'West', record: '22-9', adjOE: 116.5, adjDE: 96.2, tempo: 71.2, luck: 0.015, sos: 0.81, last10: '6-4', confRecord: '12-6', upsetFactor: 0.3 },
  { id: 'memphis', name: 'Memphis', seed: 5, region: 'West', record: '23-8', adjOE: 115.8, adjDE: 97.5, tempo: 73.5, luck: 0.032, sos: 0.78, last10: '7-3', confRecord: '12-4', upsetFactor: 0.5 },
  { id: 'missouri', name: 'Missouri', seed: 6, region: 'West', record: '21-10', adjOE: 114.2, adjDE: 98.8, tempo: 70.5, luck: 0.018, sos: 0.77, last10: '6-4', confRecord: '10-8', upsetFactor: 0.5 },
  { id: 'kansas', name: 'Kansas', seed: 7, region: 'West', record: '20-11', adjOE: 113.5, adjDE: 99.5, tempo: 68.2, luck: -0.008, sos: 0.79, last10: '5-5', confRecord: '9-9', upsetFactor: 0.4 },
  { id: 'mississippi', name: 'Mississippi', seed: 8, region: 'West', record: '22-9', adjOE: 112.8, adjDE: 100.2, tempo: 69.5, luck: 0.042, sos: 0.76, last10: '7-3', confRecord: '10-8', upsetFactor: 0.5 },
  { id: 'oklahoma', name: 'Oklahoma', seed: 9, region: 'West', record: '19-12', adjOE: 111.5, adjDE: 101.5, tempo: 68.8, luck: 0.012, sos: 0.75, last10: '5-5', confRecord: '8-10', upsetFactor: 0.5 },
  { id: 'san-diego-st', name: 'San Diego State', seed: 10, region: 'West', record: '24-7', adjOE: 112.2, adjDE: 102.8, tempo: 65.5, luck: 0.048, sos: 0.72, last10: '8-2', confRecord: '13-5', upsetFactor: 0.6 },
  { id: 'drake', name: 'Drake', seed: 11, region: 'West', record: '27-4', adjOE: 111.8, adjDE: 103.5, tempo: 66.8, luck: 0.055, sos: 0.68, last10: '9-1', confRecord: '15-3', upsetFactor: 0.7 },
  { id: 'grand-canyon', name: 'Grand Canyon', seed: 12, region: 'West', record: '25-6', adjOE: 110.2, adjDE: 104.8, tempo: 67.5, luck: 0.062, sos: 0.62, last10: '9-1', confRecord: '14-4', upsetFactor: 0.8 },
  { id: 'princeton', name: 'Princeton', seed: 13, region: 'West', record: '23-7', adjOE: 107.5, adjDE: 106.2, tempo: 64.8, luck: 0.045, sos: 0.58, last10: '8-2', confRecord: '13-3', upsetFactor: 0.9 },
  { id: 'longwood', name: 'Longwood', seed: 14, region: 'West', record: '21-11', adjOE: 104.8, adjDE: 108.5, tempo: 66.2, luck: 0.038, sos: 0.52, last10: '7-3', confRecord: '11-5', upsetFactor: 0.9 },
  { id: 'western-ky', name: 'Western Kentucky', seed: 15, region: 'West', record: '19-13', adjOE: 101.5, adjDE: 110.2, tempo: 70.5, luck: 0.032, sos: 0.48, last10: '6-4', confRecord: '9-7', upsetFactor: 0.9 },
  { id: 'howard', name: 'Howard', seed: 16, region: 'West', record: '17-14', adjOE: 98.2, adjDE: 113.5, tempo: 71.8, luck: 0.025, sos: 0.42, last10: '6-4', confRecord: '10-6', upsetFactor: 0.95 },
];

// Get teams by region
export function getTeamsByRegion(region: string): Team[] {
  return teams2025.filter(team => team.region === region);
}

// Get team by ID
export function getTeamById(id: string): Team | undefined {
  return teams2025.find(team => team.id === id);
}
