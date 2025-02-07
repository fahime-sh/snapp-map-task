import { setupServer } from 'msw/node'
import {handleGet} from './client'
export const server = setupServer(...handleGet)