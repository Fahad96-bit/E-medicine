import { Platform } from 'react-native';
export const emailRegex = new RegExp('\\S+@\\S+\\.\\S+');
export const passwordRegex = new RegExp('^(.*(([A-Za-z]+(.*)[0-9]+)|([0-9]+(.*)[A-Za-z]+))(.*))$');
export const baseUrl = Platform.OS === 'ios' ? 'http://localhost:4000/v1/' : 'http://10.0.2.2:4000/v1/';