import { useState, useEffect } from 'react'
import {decodeToken} from 'react-jwt';
import { Window } from './Window.jsx';

export function Home(){


      return (
        <>
        <div className='bg-black h-lvh w-full flex align-middle'>
          <Window></Window>
        </div>
        </>
      )
}