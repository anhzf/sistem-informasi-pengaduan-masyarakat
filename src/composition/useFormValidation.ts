export default function useFormValidation() {
  const requiredValidation = (val: unknown) => !!val || 'This field is required!';
  const shouldSameValidation = (match: unknown, matchName: string) => (val: unknown) => val === match || `This field should match with ${matchName}`;

  return {
    requiredValidation,
    shouldSameValidation,
  };
}
