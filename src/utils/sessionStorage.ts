import { JwtDecodeOptions, jwtDecode } from 'jwt-decode';

export const onLogOut = (): void => {
    sessionStorage.clear();
};

export const onLogin = (token: string): void => {
    sessionStorage.setItem("token", token); 
};

export const getIdFromTokenOnSessionStorage = (): string | null => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
        try {
            const decoded: any = jwtDecode(storedToken);
            return decoded.userId; 
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    } else {
        console.log('Stored Token not found');
        return null; 
    }
}
