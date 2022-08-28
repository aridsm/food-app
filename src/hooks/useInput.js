import  { useState } from 'react'

const useInput = (validateInput) => {


    const [value, setValue] = useState('');
    const [wasTouched, setWasTouched] = useState(false);

    const isValid = validateInput(value) && wasTouched;
    const error = !isValid && wasTouched;

  return {value, isValid, error, wasTouched, setValue, setWasTouched}
}

export default useInput