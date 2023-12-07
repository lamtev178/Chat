import React from 'react';
import { BiUser } from 'react-icons/bi';

function Message({ mess }: { mess: { isSystemMess: boolean, message: string, author: string, date: Date } }) {
  return (
    <>
      {mess.isSystemMess === true ?
        <p>{mess.message}</p>
        :
        <>
          <div>
            <p>{mess.message}</p>
          </div>
          <div className="comments-info" style={{ fontSize: '16px' }} >
            <p>
              <BiUser />{mess.author}
            </p>
            <p>{mess.date}</p>
          </div>
        </>
      }
    </>
  )
}

export default Message
