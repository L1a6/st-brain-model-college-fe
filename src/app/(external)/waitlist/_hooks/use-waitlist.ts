"use client"

import { useMutation } from "@tanstack/react-query"
import { joinWaitlist } from "@/services/waitlist-api"

// Mutation: Join Waitlist
export function useJoinWaitlist() {
  return useMutation({
    mutationKey: ["join-waitlist"],
    mutationFn: joinWaitlist,
  })
}
