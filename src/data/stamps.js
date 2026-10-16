export const stamps = [
  { id: "weather_sunny", category: "weather", label: "晴", color: "#B85C50", path: "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" },
  { id: "weather_cloud", category: "weather", label: "曇", color: "#5F7480", path: "M7.5 17h9a4 4 0 0 0 .5-8 5.5 5.5 0 0 0-10.3 1.5A3.3 3.3 0 0 0 7.5 17Z" },
  { id: "weather_rain", category: "weather", label: "雨", color: "#5F7480", path: "M7.5 15.5h9a4 4 0 0 0 .4-7.9A5.2 5.2 0 0 0 6.8 9 3.4 3.4 0 0 0 7.5 15.5ZM8 18l-1 2M12 18l-1 2M16 18l-1 2" },
  { id: "mood_calm", category: "mood", label: "穏", color: "#7C8B6F", path: "M7 11h.1M17 11h.1M8 15c2.4 2 5.6 2 8 0M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" },
  { id: "mood_tired", category: "mood", label: "休", color: "#8B6F47", path: "M8 10h3M13 10h3M8.5 16c2.2-1.2 4.8-1.2 7 0M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" },
  { id: "mood_spark", category: "mood", label: "閃", color: "#B85C50", path: "M12 2.8 14 9l6.2 2-6.2 2-2 6.2-2-6.2-6.2-2 6.2-2 2-6.2Z" },
  { id: "mark_done", category: "mark", label: "済", color: "#B85C50", path: "M4.5 12.5 9 17 19.5 6.5" },
  { id: "mark_walk", category: "mark", label: "歩", color: "#7C8B6F", path: "M9 21l1.4-6.2L8 12l2.5-4.8L15 10l2 4.2M12 5.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" },
  { id: "mark_write", category: "mark", label: "書", color: "#8B6F47", path: "M5 20l4.2-1L19 9.2 14.8 5 5 14.8 4 19.5Z" },
];

export function groupStamps() {
  return stamps.reduce((groups, stamp) => {
    groups[stamp.category] ||= [];
    groups[stamp.category].push(stamp);
    return groups;
  }, {});
}
