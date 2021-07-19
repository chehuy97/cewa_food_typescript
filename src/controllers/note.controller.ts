import { NotFound } from './../helpers/error';
import { Request, Response } from "express";
import { SuccessResponse, BadRequest } from "../helpers";
import mongoose from "mongoose";
import { noteSchema, INote, IUser, userSchema } from "../models";

const Note = mongoose.model<INote>("note", noteSchema, "note");
const User = mongoose.model<IUser>("user", userSchema, "user");

export const get_all_notes = async (req: Request, res: Response) => {
  try {
    let account_id = req.params.account_id;
    console.log("ACCOUNT ID NEK: " + account_id);
    let user = await User.findById(account_id).populate("notes").exec();
    SuccessResponse(res, user?.notes);
  } catch (error) {
    BadRequest(res, error);
  }
};

export const add_new_note = async (req: Request, res: Response) => {
  try {
    let noteRequest = req.body as INote;
    let account_id = req.body.account_id;
    console.log("ACCOUNT ID IS" + account_id);

    let newNote = new Note(noteRequest);
    newNote.users.push(account_id);
    let result = await newNote.save();
    await User.findByIdAndUpdate(
      account_id,
      { $push: { notes: result.id } },
      { new: true, useFindAndModify: true }
    );

    SuccessResponse(res, result, 201);
  } catch (err) {
    BadRequest(res, err);
  }
};

export const edit_note = async (req: Request, res: Response) => {
  try {
    let noteRequest = req.body as INote;
    let note = await Note.findByIdAndUpdate(
      noteRequest.id,
      { $set: noteRequest },
      { new: true, useFindAndModify: true }
    );
    SuccessResponse(res, note);
  } catch (err) {
    BadRequest(res, err);
  }
};

export const remove_note = async (req: Request, res: Response) => {
  try {
    let note_id = req.body.note_id;
    let result = await Note.findByIdAndRemove(note_id).exec();
    SuccessResponse(res, result);
  } catch (err) {
    BadRequest(res, err);
  }
};
export const add_new_user_in_note = async (req: Request, res: Response) => {
  try {
    let note_id = req.body.note_id;
    let email = req.body.email;
    let user = await User.findOne({ email: email });
    if (user) {
      var isNoteExistInUSer = false;
      for (var i = 0; i < user.notes.length; i++) {
        if (user.notes[i] == note_id) {
          isNoteExistInUSer = true;
          break;
        }
      }
      if (!isNoteExistInUSer) {
        let note = await Note.findByIdAndUpdate(
          note_id,
          { $push: { users: user.id } },
          { new: true, useFindAndModify: true }
        );

        await User.findByIdAndUpdate(
          user.id,
          { $push: { notes: note_id } },
          { new: true, useFindAndModify: true }
        );
        SuccessResponse(res, note);
      } else {
        NotFound(res, "Note is exist in email.");
      }
    } else {
      NotFound(res, "Email is not exist");
    }
  } catch (err) {
    BadRequest(res, err);
  }
};
