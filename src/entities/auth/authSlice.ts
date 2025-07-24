import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, login as loginApi } from "@/shared/api/auth";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true, 
  error: null,
};

// Проверка текущего пользователя (автоматическая при монтировании)
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
  try {
    await getCurrentUser();
    return true;
  } catch {
    return thunkAPI.rejectWithValue("Not authenticated");
  }
});

// Логин
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      await loginApi(credentials);
      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Неверные данные");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
