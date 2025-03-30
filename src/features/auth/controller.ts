import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { generateOTP, sendVerificationOTPEmail } from "../../services/email";
import prisma from "../../config/prisma";
import { generateToken } from "../../utils/jwt";
import { USER_TYPE } from "../../utils/constant";
import { RequestWithUser } from "../../middlewares/auth.middleware";

export async function sendVerificationEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    const otp = generateOTP();

    const isSendedEmail = await sendVerificationOTPEmail(email, otp);

    if (!isSendedEmail) return next(createHttpError(400, "Fail to send verification email, try again"));

    console.log("isSendedEmail", isSendedEmail);

    await prisma.$transaction(async (prismaTransaction) => {
      // first check otp is exist in db
      const otpExist = await prismaTransaction.otp.findUnique({
        where: {
          email,
        },
      });

      if (otpExist?.email) {
        // if exist then update
        await prismaTransaction.otp.update({
          where: { id: otpExist.id },
          data: {
            otp,
          },
        });
      } else {
        // if not exist then create
        await prismaTransaction.otp.create({
          data: {
            email,
            otp,
          },
        });
      }
    });

    res.status(200).json({ email: email, message: `Verification code sended on ${email} address.` });
  } catch (error) {
    console.log(`Error in OTP send: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in OTP send."));
  }
}

export async function verifyEmailOTP(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, otp, userType } = req.body;

    let isUserExist;

    await prisma.$transaction(async (prismaTransaction) => {
      // Retrieve the OTP from the database
      const verifyOtp = await prismaTransaction.otp.findUnique({
        where: {
          email,
        },
      });

      // Check if the OTP matches
      if (!verifyOtp || verifyOtp.otp != Number(otp)) {
        return next(createHttpError(400, "Wrong verification code (OTP)"));
      }

      // Delete the used OTP
      await prismaTransaction.otp.delete({
        where: {
          id: verifyOtp.id,
        },
      });

      isUserExist = await prismaTransaction.storeOwnerUser.findUnique({
        where: {
          email,
        },
      });
      if (!isUserExist) {
        await prismaTransaction.userVerifiedEmail.create({
          data: {
            email,
          },
        });
      }
    });

    // visitor or owner login
    if (isUserExist) {
      const token = generateToken(isUserExist, [userType]);
      res.status(200).json({ email: email, message: `Email verification successfully`, isUserExist, token });
      return;
    }

    res.status(200).json({ email: email, message: `Email verification successfully`, isUserExist });
  } catch (error) {
    console.log(`Error in OTP verify: ${error}`);
    return next(createHttpError(400, "Some thing wait wrong in OTP verify."));
  }
}

// export async function visitorUserLoginWithEmail(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { email, name, number } = req.body;
//     // check visitor user is exist or not
//     const visitorUserExists = await prisma.storeOwnerUser.findUnique({
//       where: { email },
//     });
//     if (visitorUserExists) {
//       // generate the token
//       const token = generateToken(visitorUserExists, [USER_TYPE.visitor]);
//       res.status(200).json({ token });
//       return;
//     }

//     // check email isVerified or not
//     const isEmailVerified = await prisma.userVerifiedEmail.findUnique({
//       where: {
//         email,
//       },
//     });
//     if (!isEmailVerified) return next(createHttpError(400, "email not verified, please first verify email address"));

//     const createdVisitorUser = await prisma.storeOwnerUser.create({
//       data: {
//         email,
//         name,
//         number,
//       },
//     });
//     // generate the token
//     const token = generateToken(createdVisitorUser, [USER_TYPE.visitor]);
//     res.status(200).json({ token });
//   } catch (error) {
//     console.log(`Error in visitor login: ${error}`);
//     return next(createHttpError(400, "Some thing wait wrong in visitor login."));
//   }
// }

export async function storeOwnerUserRegisterWithEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, name, number } = req.body;
    // check visitor user is exist or not
    const storeOwnerUserExists = await prisma.storeOwnerUser.findUnique({
      where: { email },
    });

    if (storeOwnerUserExists) {
      // generate the token
      const token = generateToken(storeOwnerUserExists, [USER_TYPE.owner]);
      res.status(200).json({ token });
      return;
    }

    // check email isVerified or not
    const isEmailVerified = await prisma.userVerifiedEmail.findUnique({
      where: {
        email,
      },
    });
    if (!isEmailVerified) return next(createHttpError(400, "email not verified, please first verify email address"));

    const createdStoreOwnerUser = await prisma.storeOwnerUser.create({
      data: {
        email,
        name,
        number,
      },
    });
    // generate the token
    const token = generateToken(createdStoreOwnerUser, [USER_TYPE.owner]);
    res.status(200).json({ token });
  } catch (error) {
    console.log(`Error in visitor login: ${error}`);
    return next(error);
  }
}

export async function visitorProfileUpdate(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    const { name, number } = req.body;
    const user = req.user;

    const updateVisitorProfile = await prisma.storeOwnerUser.update({
      where: { id: user?.id },
      data: {
        name,
        number,
      },
    });
    // generate the token
    const token = generateToken(updateVisitorProfile, [USER_TYPE.visitor]);
    res.status(200).json({ token });
  } catch (error) {
    console.log(`Error in visitor login: ${error}`);
    return next(error);
  }
}
