'use client';

import { useState } from 'react';

import { Button } from '@ui/Button';
import { Confirm } from '@ui/Confirm';
import { Input } from '@ui/Input';
import { Toggler } from '@ui/Toggler';
import { Form } from '@/shared/ui/Form';
import { Popup } from '@/shared/ui/Popup';
import { TabBar } from '@widgets/TabBar';
import { User } from '@widgets/User';

export default function Home() {
  const [value, setValue] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [popupShown, setPopupShown] = useState<boolean>(false);

  return (
    <>
      <TabBar />
      <main className='p-4 flex flex-col gap-2 overflow-scroll h-screen'>
        <Button content='Test' onClick={() => console.log('Click')} />
        <div className='w-full p-4 bg-neutral-200'>
          <Confirm
            content='Confirm?'
            submit={() => console.log('Submitted')}
            onDecline={() => console.log('Declined')}
          />
        </div>
        <Input
          id='example'
          placeholder='Example'
          value={value}
          onChange={setValue}
        />
        <Toggler
          content='Toggler'
          checked={checked}
          onToggle={() => setChecked((prev) => !prev)}
        />
        <Form
          buttonText='Submit'
          onSubmit={(userInfo) => console.log(userInfo)}
        />
        <button
          className='underline my-4 cursor-pointer'
          onClick={() => setPopupShown(true)}
        >
          Click to open popup
        </button>
        {popupShown && (
          <Popup
            heading='Popup'
            children={<p>Hello, World!</p>}
            onClose={() => setPopupShown(false)}
          />
        )}
        <User
          type='account'
          name='Example account'
          email='example@email.com'
          avatar='https://i.pinimg.com/736x/90/2a/c5/902ac5d9530185d81b4f3f91b9fd7c17.jpg'
          onClick={() => console.log('User account')}
        />
        <User
          type='contact'
          name='Example contact'
          email='example@email.com'
          avatar='https://i.pinimg.com/736x/3e/a8/f1/3ea8f18e9888280073e6627bd6c12969.jpg'
          onClick={() => console.log('User contact')}
        />
      </main>
    </>
  );
}
