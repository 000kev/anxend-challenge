import { Alert } from 'flowbite-react';

export default function DBAlert() {
  return (
    <Alert color="failure" rounded>
      <span className="font-medium">Hmm...</span> Your entry was invalid and was not pushed to the database.
    </Alert>
  );
}