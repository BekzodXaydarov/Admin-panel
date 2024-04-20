import React from 'react';
import { Modal, Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


export default function ModalComponent({btn_title,body,title}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
      >
        {body({ close })}
      </Modal>

      <Group position="center">
        <Button onClick={open}>
          {btn_title}
        </Button>
      </Group>
    </>
  );
}
