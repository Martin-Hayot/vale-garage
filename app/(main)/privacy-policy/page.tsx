const PrivacyPolicyPage = () => {
    return (
        <div>
            <div className="p-6 mt-5 max-w-4xl mx-auto">
                <h1 className="text-3xl mx-auto font-bold text-gray-900 dark:text-gray-100">
                    Privacy Policy
                </h1>
            </div>
            <main className="px-6 pb-10 max-w-4xl mx-auto font-sans text-gray-800 dark:text-gray-200">
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                    At <strong>VaLe Garage</strong>, we are committed to
                    protecting your privacy and ensuring the security of your
                    personal data. This Privacy Policy explains how we collect,
                    use, and protect your information, as well as your rights
                    under the General Data Protection Regulation (GDPR).
                </p>

                <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-gray-100">
                    1. Data We Collect
                </h2>
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                    We collect the following personal data when you create an
                    account or interact with our platform:
                </p>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <strong>Required for account creation:</strong> First
                        name, last name, email address, and password.
                    </li>
                    <li>
                        <strong>For merchant accounts:</strong> Company name and
                        VAT number.
                    </li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-gray-100">
                    2. How We Use Your Data
                </h2>
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                    The data we collect is used exclusively for the proper
                    functioning of our platform. This includes:
                </p>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        Authenticating users and managing access to specific
                        features (e.g., auctions).
                    </li>
                    <li>Ensuring the seamless operation of the platform.</li>
                </ul>
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                    <strong>
                        VaLe Garage does not share your personal data with any
                        third parties.
                    </strong>
                </p>

                <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-gray-100">
                    3. Data Retention
                </h2>
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                    We retain your personal data for the maximum period allowed
                    under the GDPR. You may delete your account and associated
                    data at any time by using the account deletion feature in
                    your profile settings.
                </p>

                <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-gray-100">
                    4. Cookies and Similar Technologies
                </h2>
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                    VaLe Garage uses cookies exclusively for maintaining user
                    sessions (e.g., authentication tokens using JWT). We do not
                    use tracking or analytical cookies. As such, cookie
                    preference management is not required.
                </p>

                <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-gray-100">
                    5. Data Security
                </h2>
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                    We implement industry-standard security measures to protect
                    your data, including:
                </p>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        Encrypted storage of passwords using secure hashing
                        algorithms.
                    </li>
                    <li>
                        Use of HTTPS to encrypt all data transmitted between
                        your browser and our servers.
                    </li>
                    <li>Regular backups to prevent data loss.</li>
                    <li>
                        Access controls to restrict unauthorized access to our
                        systems.
                    </li>
                </ul>
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                    For further details, feel free to contact us at:
                    <a
                        href="mailto:m.hayot@students.ephec.be"
                        className="text-blue-600 hover:underline"
                    >
                        m.hayot@students.ephec.be
                    </a>
                    .
                </p>

                <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-gray-100">
                    6. Your Rights
                </h2>
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                    Under the GDPR, you have the following rights regarding your
                    personal data:
                </p>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <strong>Access:</strong> You can request access to the
                        personal data we hold about you.
                    </li>
                    <li>
                        <strong>Modification:</strong> You can edit your first
                        name and password in your account settings.
                    </li>
                    <li>
                        <strong>Deletion:</strong> You can delete your account
                        at any time, which will permanently remove your data
                        from our systems.
                    </li>
                </ul>
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                    If you have any questions or requests regarding your data,
                    please contact us at:
                    <a
                        href="mailto:m.hayot@students.ephec.be"
                        className="text-blue-600 hover:underline"
                    >
                        m.hayot@students.ephec.be
                    </a>
                    .
                </p>

                <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-gray-100">
                    7. Legal Basis and Jurisdiction
                </h2>
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                    This Privacy Policy is governed by the General Data
                    Protection Regulation (GDPR) applicable in the European
                    Union. By using VaLe Garage, you agree to the processing of
                    your data in compliance with these regulations.
                </p>

                <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-gray-100">
                    8. Changes to This Policy
                </h2>
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                    We reserve the right to update this Privacy Policy at any
                    time. Significant changes will be communicated through the
                    platform. Continued use of the platform after changes have
                    been made constitutes acceptance of the updated policy.
                </p>

                <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
                    Last updated: January 2025
                </p>
            </main>
        </div>
    );
};

export default PrivacyPolicyPage;
