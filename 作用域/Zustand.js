// myZustand.js
import { useState, useEffect, useRef } from "react";

export function create(fn) {
  let state;
  const listeners = new Set();

  // 状态变更
  const setState = (partial) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;

    if (nextState !== state) {
      state = { ...state, ...nextState };
      listeners.forEach((listener) => listener());
    }
  };

  // 获取最新 state
  const getState = () => state;

  // 返回 hooks
  function useStore(selector = (s) => s) {
    const [, setTick] = useState({});
    const selectorRef = useRef(selector);
    selectorRef.current = selector;

    useEffect(() => {
      const listener = () => {
        setTick({});
      };
      listeners.add(listener);
      return () => listeners.delete(listener);
    }, []);

    return selectorRef.current(state);
  }

  // 初始化 store
  state = fn(setState, getState);

  // 返回 hooks
  useStore.setState = setState;
  useStore.getState = getState;
  return useStore;
}

// store.js
import { create } from "./myZustand";

export const useCounterStore = create((set, get) => {
  return {
    count: 0,
    inc: () => set((state) => ({ count: state.count + 1 })),
    dec: () => set((state) => ({ count: state.count - 1 })),
  };
});

// Counter.jsx
import React from "react";
import { useCounterStore } from "./store";

export default function Counter() {
  const store = useCounterStore();

  return (
    <div>
      <button onClick={store.dec}>-</button>
      <span style={{ margin: "0 10px" }}>{store.count}</span>
      <button onClick={store.inc}>+</button>
    </div>
  );
}



export function create(fn){
  let state
  const listeners = new Set()
  const useStore=(selector = (s)=>s)=>{
    const [,setTick] =useState({})
    useEffect(()=>{
      const listener = ()=>setTick({})
        listeners.add(listener)
        return () => listeners.delete(listener)
    },[])
    
    return selector(state)
  }

  const setState = (partial)=>{
      const nextState = typeof partial==="function" ? partial(state):partial
      state = {...state,...nextState}
      listener.forEach((item)=>item())
  }
  const getState = () => state 

  state = fn(setState,getState)
  return useStore
}

const useCounterStore = create((set,get)=>{
  return{
    count:0,
    setcountup: ()=>set((state)=>{count:state.count+1})
  }
})

const store = useCounterStore()