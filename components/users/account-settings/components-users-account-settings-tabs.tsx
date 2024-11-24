"use client";

import IconHome from "@/components/icon/icon-home";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    useGetUserQuery,
    useUpdateUserMutation,
} from "@/store/api/auth/authApi";
import { toast } from "sonner";

// Define the Zod schema for validation
const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    mobile: z
        .string()
        .min(1, "Mobile number is required")
        .regex(
            /^\+?\d{1,3}[-\s]?\(?\d{1,4}\)?[-\s]?\d{1,4}[-\s]?\d{1,4}$/,
            "Invalid mobile number"
        ),
    email: z.string().email("Invalid email address"),
    username: z.string().min(1, "Username is required"),
});

type FormData = z.infer<typeof schema>;

const ComponentsUsersAccountSettingsTabs = () => {
    const [tabs, setTabs] = useState<string>("home");

    // Fetch current user profile data
    const { data: userProfile, error, isLoading } = useGetUserQuery([]);

    // Setup the form with react-hook-form and Zod validation
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [updateUserProfile, { isLoading: isUpdatingProfile }] =
        useUpdateUserMutation();

    useEffect(() => {
        // Ensure the data is fetched and reset the form when it's available
        if (userProfile) {
            reset({
                firstName: userProfile?.data?.firstName,
                lastName: userProfile?.data?.lastName,
                mobile: userProfile?.data?.mobile,
                email: userProfile?.data?.email,
                username: userProfile?.data?.username,
            });
        }
    }, [userProfile, reset]); // Depend on userProfile to reset form when data is available

    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    const onSubmit = async (data: FormData) => {
        const toastID = toast.loading("Updating profile");
        try {
            const res = await updateUserProfile(data).unwrap();
            if (res?.success) {
                toast.success("Profile updated successfully", {
                    duration: 3000,
                    id: toastID,
                });
                reset(data);
            } else {
                toast.error(res?.message, {
                    duration: 3000,
                    id: toastID,
                });
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "An error occurred", {
                duration: 3000,
                id: toastID,
            });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching user profile</div>;
    }

    return (
        <div className="pt-5">
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">
                    Settings
                </h5>
            </div>
            <div>
                <ul className="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a] sm:flex">
                    <li className="inline-block">
                        <button
                            onClick={() => toggleTabs("home")}
                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${
                                tabs === "home"
                                    ? "!border-primary text-primary"
                                    : ""
                            }`}
                        >
                            <IconHome />
                            Home
                        </button>
                    </li>
                </ul>
            </div>

            {tabs === "home" && (
                <div>
                    <form
                        className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h6 className="mb-5 text-lg font-bold">
                            General Information
                        </h6>
                        <div className="flex flex-col sm:flex-row">
                            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        placeholder="Jimmy"
                                        className="form-input"
                                        {...register("firstName")}
                                    />
                                    {errors.firstName && (
                                        <p className="text-sm text-red-500">
                                            {errors.firstName.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        placeholder="Turner"
                                        className="form-input"
                                        {...register("lastName")}
                                    />
                                    {errors.lastName && (
                                        <p className="text-sm text-red-500">
                                            {errors.lastName.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="mobile">Mobile</label>
                                    <input
                                        id="mobile"
                                        type="text"
                                        placeholder="+1 (530) 555-12121"
                                        className="form-input"
                                        {...register("mobile")}
                                    />
                                    {errors.mobile && (
                                        <p className="text-sm text-red-500">
                                            {errors.mobile.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Jimmy@gmail.com"
                                        className="form-input opacity-50"
                                        {...register("email")}
                                        disabled={true}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="jimmy012"
                                        className="form-input"
                                        {...register("username")}
                                    />
                                    {errors.username && (
                                        <p className="text-sm text-red-500">
                                            {errors.username.message}
                                        </p>
                                    )}
                                </div>
                                <div className="mt-3 sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isUpdatingProfile}
                                    >
                                        {isUpdatingProfile
                                            ? "Updating..."
                                            : "Update Profile"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ComponentsUsersAccountSettingsTabs;
