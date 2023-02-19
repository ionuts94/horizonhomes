import React, { useState, useEffect, useRef } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';

export function Form({ children }) {
  const [state, setState] = useState({})
  const [childrenWithProps, setChildrenWithProps] = useState([]);
  const formStateRef = useRef();

  useEffect(function injectChildrenProps() {
    const childrenWithPropsCopy = React.Children
      .toArray(children)
      .map(child => {
        if (React.isValidElement(child) && child.type === Form.Input && child.props.type === 'password') {
          const id = child.props.id;
          const childElem = React.cloneElement(child, {
            onChange: onInputChange,
            value: state[id]?.value,
            type: state[id]?.showPassword ? 'text' : 'password'
          });

          function toggleShowPassword() {
            setState({
              ...state,
              [id]: {
                ...state[id],
                showPassword: !state[id].showPassword
              }
            })
          }

          return (
            <div key={() => uuid()} className='relative mb-6'>
              {childElem}
              {state[id]?.showPassword
                ? <AiFillEyeInvisible
                  onClick={() => toggleShowPassword(id)}
                  className='absolute right-3 top-3 text-xl cursor-pointer'
                />
                : <AiFillEye
                  onClick={() => toggleShowPassword(id)}
                  className='absolute right-3 top-3 text-xl cursor-pointer'
                />
              }
            </div>
          )
        }

        if (React.isValidElement(child) && child.type === Form.Input) {
          const id = child.props.id;
          return React.cloneElement(child, {
            onChange: onInputChange,
            value: state[id]?.value,
          });
        }

        if (React.isValidElement(child) && child.props.type === 'submit') {
          return React.cloneElement(child, {
            onClick: () => {
              if (typeof child.props.onClick !== 'function') {
                console.warn("There is no onClick handler passed to this button: ", child.type.name);
                return;
              }
              formStateRef.current = { ...state };
              child.props.onClick(state)
            }
          });
        }

        return child;
      });

    setChildrenWithProps(childrenWithPropsCopy);
  }, [state, children])

  useEffect(function buildState() {
    const st = {};
    React.Children
      .toArray(children)
      .forEach(child => {
        if (React.isValidElement(child) && child.type === Form.Input) {
          const id = child.props.id || uuid();
          st[id] = {
            value: ''
          };
          return React.cloneElement(child, {
            id: id
          });
        }
        return child;
      });

    setState(st);
  }, [children])

  function onInputChange(e) {
    formStateRef.current = null;
    setState({
      ...state,
      [e.target.id]: {
        ...state[e.target.id],
        value: e.target.value
      }
    })
  }

  useEffect(function saveStateFormOnSubmit() {
    if (formStateRef.current) {
      setState(formStateRef.current);
    }
  }, [formStateRef.current, state])

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      return;
    }}>
      {childrenWithProps}
    </form>
  )
}

function Input({ type, id, onChange, value = '', placeholder }) {
  return (
    <input
      className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

Form.Input = Input;