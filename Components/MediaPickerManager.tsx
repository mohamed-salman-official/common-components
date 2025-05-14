import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

export type MediaType = "audio" | "video" | "image" | "all";

export interface MediaPickResult {
  uri: string;
  name?: string;
  mimeType?: string;
  size?: number;
}

export class MediaPickerManager {
  static async pickMedia(type: MediaType): Promise<MediaPickResult | null> {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: this.getMimeType(type),
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled || !result.assets?.[0]) {
        return null;
      }

      const asset = result.assets[0];

      return {
        uri: asset.uri,
        name: asset.name,
        mimeType: asset.mimeType,
        size: asset.size,
      };
    } catch (error) {
      console.error(`[MediaPickerManager] pickMedia failed:`, error);
      return null;
    }
  }

  static async pickAudio(): Promise<MediaPickResult | null> {
    return this.pickMedia("audio");
  }

  static async pickVideo(): Promise<MediaPickResult | null> {
    return this.pickMedia("video");
  }

  static async pickImageFromLibrary(): Promise<MediaPickResult | null> {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        console.warn("Media library permission not granted.");
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled || !result.assets?.[0]) {
        return null;
      }

      const asset = result.assets[0];

      return {
        uri: asset.uri,
        name: asset.fileName ?? undefined,
        mimeType: asset.type,
        size: asset.fileSize,
      };
    } catch (error) {
      console.error(`[MediaPickerManager] pickImageFromLibrary failed:`, error);
      return null;
    }
  }

  static async pickImageFromCamera(): Promise<MediaPickResult | null> {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        console.warn("Camera permission not granted.");
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled || !result.assets?.[0]) {
        return null;
      }

      const asset = result.assets[0];

      return {
        uri: asset.uri,
        name: asset.fileName ?? undefined,
        mimeType: asset.type,
        size: asset.fileSize,
      };
    } catch (error) {
      console.error(`[MediaPickerManager] pickImageFromCamera failed:`, error);
      return null;
    }
  }

  private static getMimeType(type: MediaType): string {
    switch (type) {
      case "audio":
        return "audio/*";
      case "video":
        return "video/*";
      case "image":
        return "image/*";
      case "all":
        return "*/*";
      default:
        return "*/*";
    }
  }
}
