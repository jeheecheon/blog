import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CreateDummyPromiseAwaiter, PromiseAwaiter, wrapPromise } from '@/common/utils/promiseWrapper';

export interface PromisesState {
  comments: PromiseAwaiter,
}

const initialState: PromisesState = {
  comments: CreateDummyPromiseAwaiter(),
}

export const promisesSlice = createSlice({
  name: 'promises',
  initialState,
  reducers: {
    startFetchingComments: (state, action: PayloadAction<string>) => {
      state.comments = wrapPromise(fetch(`/api/blog/post/${action.payload}/comments`));
    }
  },
})

// Action creators are generated for each case reducer function
export const { startFetchingComments } = promisesSlice.actions

export default promisesSlice.reducer