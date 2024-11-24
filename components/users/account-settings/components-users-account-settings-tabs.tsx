"use client";
import IconDollarSignCircle from "@/components/icon/icon-dollar-sign-circle";
import IconFacebook from "@/components/icon/icon-facebook";
import IconGithub from "@/components/icon/icon-github";
import IconHome from "@/components/icon/icon-home";
import IconLinkedin from "@/components/icon/icon-linkedin";
import IconPhone from "@/components/icon/icon-phone";
import IconTwitter from "@/components/icon/icon-twitter";
import IconUser from "@/components/icon/icon-user";
import React, { useState } from "react";

const ComponentsUsersAccountSettingsTabs = () => {
    const [tabs, setTabs] = useState<string>("home");
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

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
                    {/* <li className="inline-block">
                        <button
                            onClick={() => toggleTabs('payment-details')}
                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'payment-details' ? '!border-primary text-primary' : ''}`}
                        >
                            <IconDollarSignCircle />
                            Payment Details
                        </button>
                    </li>
                    <li className="inline-block">
                        <button
                            onClick={() => toggleTabs('preferences')}
                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'preferences' ? '!border-primary text-primary' : ''}`}
                        >
                            <IconUser className="h-5 w-5" />
                            Preferences
                        </button>
                    </li>
                    <li className="inline-block">
                        <button
                            onClick={() => toggleTabs('danger-zone')}
                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'danger-zone' ? '!border-primary text-primary' : ''}`}
                        >
                            <IconPhone />
                            Danger Zone
                        </button>
                    </li> */}
                </ul>
            </div>
            {tabs === "home" ? (
                <div>
                    <form className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
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
                                        name="firstName"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        placeholder="Turner"
                                        className="form-input"
                                        name="lastName"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mobile">Mobile</label>
                                    <input
                                        id="mobile"
                                        type="text"
                                        placeholder="+1 (530) 555-12121"
                                        className="form-input"
                                        name="mobile"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Jimmy@gmail.com"
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="jimmy012"
                                        className="form-input"
                                        name="username"
                                    />
                                </div>
                                <div className="mt-3 sm:col-span-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default ComponentsUsersAccountSettingsTabs;
