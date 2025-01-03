"use client";

import { usePathname } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Link from "next/link";
import { Fragment } from "react";

const BreadCrumbAdmin = () => {
    const path = usePathname();
    const prefix = "admin";
    const pathnames = path.split("/").filter((x) => {
        return x !== "" && x !== prefix;
    });

    return (
        <Breadcrumb className="hidden md:flex ">
            <BreadcrumbList className="text-xl">
                {pathnames.map((name, index) => {
                    const href = `/${prefix}/${pathnames
                        .slice(0, index + 1)
                        .join("/")}`;
                    const linkname =
                        name.charAt(0).toUpperCase() +
                        name.slice(1, name.length);
                    const isLast = index === pathnames.length - 1;
                    return (
                        <Fragment key={index}>
                            <BreadcrumbItem>
                                {!isLast ? (
                                    <BreadcrumbLink asChild>
                                        <Link href={href}>{linkname}</Link>
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>{linkname}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadCrumbAdmin;
