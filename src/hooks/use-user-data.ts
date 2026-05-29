"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { clearStoredAuthSession, getUserData, sendLogoutRequest } from "@/lib/api/auth"
import { useAuthStore } from "@/store/auth-store"

const USER_DATA_KEY = ["user"]

export function useGetUser() {
  return useQuery({
    queryKey: USER_DATA_KEY,
    queryFn: () => getUserData(),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 60,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const clearAuth = useAuthStore((state) => state.clearAuth)

  return useMutation({
    mutationFn: sendLogoutRequest,
    onSuccess: () => {
      clearStoredAuthSession()
      clearAuth()
      queryClient.removeQueries({ queryKey: USER_DATA_KEY })

      if (typeof window !== "undefined") window.location.href = "/"
    },
  })
}
