import { Request } from 'express';
import DecodedToken from './DecodedToken';

interface RequestWithToken extends Request {
  decodedToken: string | DecodedToken;
}

export default RequestWithToken;
