import React, { useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export function PerfilImagePet() {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [error, setError] = useState<string>('');

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload a valid image file.');
                return;
            }

            if (file.size > 2 * 1024 * 1024) { // 2MB
                setError('File size should be less than 2MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setAvatar(null);
    };

    return (
        <div className="flex flex-col items-center avatar-upload">
            <label className="block text-lg font-bold text-gray-700">Upload Avatar</label>
            <div className="mt-2 flex flex-col items-center">
                <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                    {avatar ? (
                        <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                        <Avatar className="h-full w-full" />
                    )}
                </span>
                <div className="mt-2 mb-4 flex space-x-2">
                    <div className="relative">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Button
                            type="button"
                            className="px-4 py-2 text-white rounded">
                            Choose Image
                        </Button>
                    </div>
                    {avatar && (
                        <Button
                            onClick={handleRemoveImage}
                            className="px-4 py-2 bg-red-500 text-white rounded">
                            Remove Image
                        </Button>
                    )}
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
