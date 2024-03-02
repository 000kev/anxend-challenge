import { Alert } from 'flowbite-react';

export default function DBAlert() {
  return (
    <Alert className="mt-5 w-48" color="warning" rounded>
      <span className="font-medium ">Please select a filter</span>
    </Alert>
  );
}