import jwt from 'jsonwebtoken';

interface DecodedToken extends jwt.JwtPayload {
  id: string;
}

export default DecodedToken;
