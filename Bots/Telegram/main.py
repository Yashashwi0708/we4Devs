from typing import Final
import requests
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, MessageHandler, filters, ContextTypes, CallbackQueryHandler

# Constants
TOKEN: Final = '6343701605:AAHB38P9f2AqD-RMxKxP5XUGVWVcHcleook'
BOT_USERNAME: Final = '@SafeGuradBot'
WEBSITE_URL: Final = 'https://SafeGuard.wcewlug.org'  

# Responses
async def handle_response(text: str, update: Update, context: ContextTypes.DEFAULT_TYPE) -> str:
    processed: str = text.lower()

    if len(processed) == 10 and processed.isdigit():
        await handle_number_message(update, context, processed)
        return ""  # Return an empty string to avoid printing the coroutine object
    elif len(text) > 10:
        await handle_text_message(update, context)
        return ""  # Return an empty string to avoid printing the coroutine object
    else:
        await update.message.reply_text("I do not understand you.")
        await help_command(update, context)
        return "I do not understand you."

async def button_pressed(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    if query.data == 'message':
        await message_command(update, context)
    elif query.data == 'number':
        await number_command(update, context)
    elif query.data == 'visit':
        await visit_command(update, context)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("Message", callback_data='message')],
        [InlineKeyboardButton("Number", callback_data='number')],
        [InlineKeyboardButton("Visit", callback_data='visit')],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(f'Hello, I am {BOT_USERNAME}! What do you want to check?', reply_markup=reply_markup)

async def message_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    context.user_data['waiting_for_message'] = True
    await update.callback_query.edit_message_text('Type your message:')

async def number_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.callback_query.edit_message_text('Please enter a number:')
    context.user_data['waiting_for_number'] = True

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("You can type a message to verify if it's spam")
    await update.message.reply_text("You can also type a number to get information about it")
    await update.message.reply_text("You can also visit our website for more features")
    await update.message.reply_text("To get started, type /start")

async def handle_number_message(update: Update, context: ContextTypes.DEFAULT_TYPE, number: str):
    url = 'https://h5cnt98fwf.execute-api.eu-north-1.amazonaws.com/we4dev/getInfo'
    payload = {
        "number": number
    }
    response = requests.post(url, json=payload).json()
    body = response.get("body", {})
    if body:
        data = eval(body)
        formatted_response = f"From the provided phone number:\n\nName: {data.get('name', 'N/A')}\naltName: {data.get('altName', 'N/A')}\naccess: {data.get('access', 'N/A')}\nState: {data.get('city', 'N/A')}\ncountry: {data.get('country', 'N/A')}\nemail: {data.get('email', 'N/A')}\ncarrier: {data.get('carrier', 'N/A')}\n"
        badges = data.get("badges", [])
        if "verified" in [b.lower() for b in badges]:
            formatted_response += "badges: Verified\n"
        else:
            formatted_response += "badges: Unverified\n"
        score = data.get("score", 0.0)
        if score < 0.9:
            formatted_response += "score: Less information is available\n"
        else:
            formatted_response += "score: Standard information available\n"
        formatted_response += f"ruleName: {data.get('ruleName', 'N/A')}"
        update.message.reply_text("Processing your number...")
        await update.message.reply_text(formatted_response)
    else:
        await update.message.reply_text("No information available for the provided number.")

async def visit_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.callback_query.edit_message_text(f'Visit our website: {WEBSITE_URL} for more features!!')

async def handle_text_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    message_type: str = update.message.chat.type
    text: str = update.message.text
    print(f'User ({update.message.chat.id}) in {message_type} said: {text}')
    if 'waiting_for_message' in context.user_data and context.user_data['waiting_for_message']:
        context.user_data['waiting_for_message'] = False
        payload = {
            "input_text": text
        }
        url = "http://10.40.11.12:3000/checkSpam"
        response = requests.post(url, json=payload).json()
        is_spam = response.get("is_Spam", False)
        probability = response.get("probability", 0.0) * 100
        formatted_response = f"Spam: {'Yes' if is_spam else 'No'}\nProbability: {probability:.2f}%"
        update.message.reply_text("Processing your message...")
        await update.message.reply_text(formatted_response)
    else:
        response: str = await handle_response(text, update, context)  # Await the handle_response coroutine
        print(f'{BOT_USERNAME} responded with: {response}')
        await update.message.reply_text(response)

async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print(f'Update {update} caused error {context.error}')

if __name__ == '__main__':
    print('Bot started!')
    app = ApplicationBuilder().token(TOKEN).build()

    # Start command
    app.add_handler(MessageHandler(filters.COMMAND & ~filters.UpdateType.EDITED_MESSAGE, start))

    # Button callbacks
    app.add_handler(CallbackQueryHandler(button_pressed, pattern=r'^(message|number|visit)$'))

    # Messages
    app.add_handler(MessageHandler(filters.TEXT, handle_text_message))

    # Errors
    app.add_error_handler(error)

    # Start polling
    print('Bot is listening!')
    app.run_polling()