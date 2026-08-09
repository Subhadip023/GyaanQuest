import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [skillInput, setSkillInput] = useState('');

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        bio: user.bio ?? '',
        institution: user.institution ?? '',
        skills: user.skills ?? [],
        avatar: null,
        _method: 'POST',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'), { forceFormData: true });
    };

    const addSkill = () => {
        const skill = skillInput.trim();
        if (skill && !data.skills.includes(skill)) {
            setData('skills', [...data.skills, skill]);
            setSkillInput('');
        }
    };

    const removeSkill = (skill) => {
        setData('skills', data.skills.filter(s => s !== skill));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">

                {/* Avatar */}
                <div>
                    <InputLabel value="Profile Photo" />
                    <div className="flex items-center gap-4 mt-2">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 overflow-hidden flex items-center justify-center">
                            {user.avatar
                                ? <img src={`/storage/${user.avatar}`} alt="avatar" className="w-full h-full object-cover" />
                                : <span className="text-2xl font-bold text-indigo-700">{user.name?.charAt(0)}</span>
                            }
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setData('avatar', e.target.files[0])}
                            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                    </div>
                    <InputError className="mt-2" message={errors.avatar} />
                </div>

                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Bio */}
                <div>
                    <InputLabel htmlFor="bio" value="Bio" />
                    <textarea
                        id="bio"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-24 resize-none"
                        value={data.bio}
                        onChange={e => setData('bio', e.target.value)}
                        placeholder="Tell us a little about yourself..."
                        maxLength={1000}
                    />
                    <InputError className="mt-2" message={errors.bio} />
                </div>

                {/* Institution */}
                <div>
                    <InputLabel htmlFor="institution" value="Institution / Organization" />
                    <TextInput
                        id="institution"
                        className="mt-1 block w-full"
                        value={data.institution}
                        onChange={e => setData('institution', e.target.value)}
                        placeholder="e.g. Delhi University, Google"
                    />
                    <InputError className="mt-2" message={errors.institution} />
                </div>

                {/* Skills */}
                <div>
                    <InputLabel value="Skills" />
                    <div className="flex gap-2 mt-1">
                        <TextInput
                            className="flex-1"
                            value={skillInput}
                            onChange={e => setSkillInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                            placeholder="e.g. Python, Mathematics"
                        />
                        <button
                            type="button"
                            onClick={addSkill}
                            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold text-sm hover:bg-indigo-200 transition"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {(data.skills ?? []).map(skill => (
                            <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                                {skill}
                                <button type="button" onClick={() => removeSkill(skill)} className="ml-1 text-indigo-400 hover:text-red-500 transition">×</button>
                            </span>
                        ))}
                    </div>
                    <InputError className="mt-2" message={errors.skills} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

