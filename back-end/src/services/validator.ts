import * as yup from 'yup';

export const productValidator = yup.object({
  cropType: yup.string().required('Please enter a crop type'),
  cropVariety: yup.string().required('Please enter a crop variety'),
  location: yup.string().required('Please enter location'),
  quantity: yup.string().required('Please enter quantity'),
  packagingStatus: yup.string().required('Please enter packagingStatus'),
  harvestDate: yup.string().required('Please enter harvestDate'),
  entryDate: yup.string().required('Please enter entryDate'),
  picture: yup
    .mixed()
    .test('is-buffer', 'Invalid buffer data', value => {
      return Buffer.isBuffer(value);
    })
    .required('Please enter picture'),
  // picture: yup.string().required('Please enter picture'),
  grade: yup.string().required('Please enter grade'),
  pricePerQuintal: yup.string().required('Please enter pricePerQuintal'),
  appId: yup.number().required('Please enter valide appId'),
});
